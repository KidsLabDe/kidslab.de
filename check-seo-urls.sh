#!/bin/bash
# Prüft alle SEO-URLs aus der Google Search Console CSV gegen den lokalen Hugo Dev-Server
# Nur kidslab.de URLs (keine Subdomains wie handbuch., gameslab., editor., plan.)

BASE_URL="http://localhost:1313"
CSV_FILE="seo-data/Seiten.csv"
OUTPUT_CSV="seo-data/url-check-ergebnis.csv"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m'

if [ ! -f "$CSV_FILE" ]; then
    echo "Fehler: $CSV_FILE nicht gefunden. Bitte aus hugo/ Ordner ausführen."
    exit 1
fi

# Prüfe ob Dev-Server läuft
if ! curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" > /dev/null 2>&1; then
    echo "Fehler: Hugo Dev-Server läuft nicht auf $BASE_URL"
    echo "Starte ihn mit: hugo server -D -F"
    exit 1
fi

# CSV-Header schreiben
echo "Status,Alte URL,Neue URL (Hugo),Klicks,Impressionen,HTTP Code" > "$OUTPUT_CSV"

echo ""
echo "${BOLD}SEO URL Check - kidslab.de → Hugo Migration${NC}"
echo "============================================="
echo ""

found=0
missing=0
redirect=0
skipped=0

# Temporäre Dateien für Ergebnisse
missing_file=$(mktemp)
found_file=$(mktemp)
redirect_file=$(mktemp)

# CSV lesen, Header überspringen
tail -n +2 "$CSV_FILE" | while IFS=',' read -r url klicks impressionen ctr position; do
    # Nur kidslab.de URLs (keine Subdomains)
    if ! echo "$url" | grep -qE '^https://kidslab\.de'; then
        skipped=$((skipped + 1))
        continue
    fi

    # URL-Pfad extrahieren
    path=$(echo "$url" | sed 's|https://kidslab.de||')

    # Leerer Pfad = Homepage
    if [ -z "$path" ] || [ "$path" = "/" ]; then
        path="/"
    fi

    # Trailing Slash sicherstellen (Hugo-Konvention)
    if [ "$path" != "/" ] && ! echo "$path" | grep -q '/$' && ! echo "$path" | grep -qE '\.[a-z]+$'; then
        path="${path}/"
    fi

    # HTTP-Request an Dev-Server
    http_code=$(curl -s -o /dev/null -w "%{http_code}" -L "${BASE_URL}${path}")

    # Auch ohne Redirect prüfen
    http_code_no_follow=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${path}")

    if [ "$http_code" = "200" ]; then
        if [ "$http_code_no_follow" = "301" ] || [ "$http_code_no_follow" = "302" ]; then
            redirect_target=$(curl -s -o /dev/null -w "%{redirect_url}" "${BASE_URL}${path}")
            # Redirect-Ziel als relativen Pfad speichern
            new_path=$(echo "$redirect_target" | sed "s|${BASE_URL}||")
            echo -e "${YELLOW}↪ REDIRECT${NC} ${path} → ${new_path} (${klicks} Klicks)"
            echo "${klicks},${path},${new_path}" >> "$redirect_file"
            echo "REDIRECT,${url},${new_path},${klicks},${impressionen},${http_code_no_follow}" >> "$OUTPUT_CSV"
        else
            echo -e "${GREEN}✓ OK${NC}       ${path} (${klicks} Klicks)"
            echo "${klicks},${path}" >> "$found_file"
            echo "OK,${url},${path},${klicks},${impressionen},${http_code}" >> "$OUTPUT_CSV"
        fi
    else
        echo -e "${RED}✗ FEHLT${NC}   ${path} (${klicks} Klicks, ${impressionen} Impressionen)"
        echo "${klicks},${impressionen},${path},${url}" >> "$missing_file"
        echo "FEHLT,${url},,${klicks},${impressionen},${http_code}" >> "$OUTPUT_CSV"
    fi
done

echo ""
echo "============================================="
echo "${BOLD}Zusammenfassung:${NC}"
echo -e "  ${GREEN}Gefunden:${NC}  $(wc -l < "$found_file" 2>/dev/null | tr -d ' ')"
echo -e "  ${YELLOW}Redirect:${NC}  $(wc -l < "$redirect_file" 2>/dev/null | tr -d ' ')"
echo -e "  ${RED}Fehlend:${NC}   $(wc -l < "$missing_file" 2>/dev/null | tr -d ' ')"
echo ""

if [ -s "$missing_file" ]; then
    echo "${BOLD}Fehlende URLs (sortiert nach Klicks):${NC}"
    echo "Klicks | Impressionen | Pfad"
    echo "-------|-------------|------"
    sort -t',' -k1 -nr "$missing_file" | while IFS=',' read -r klicks impressionen path url; do
        printf "%-6s | %-11s | %s\n" "$klicks" "$impressionen" "$path"
    done
fi

echo ""
echo "Ergebnisse gespeichert in: ${BOLD}${OUTPUT_CSV}${NC}"

# Aufräumen
rm -f "$missing_file" "$found_file" "$redirect_file"
