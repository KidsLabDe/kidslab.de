#!/bin/bash
# Prüft alle internen und externen Links auf der Hugo-Seite
# Benötigt laufenden Hugo Dev-Server auf localhost:1313

BASE_URL="http://localhost:1313"
OUTPUT_CSV="seo-data/link-check-ergebnis.csv"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m'

# Prüfe ob Dev-Server läuft
if ! curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" > /dev/null 2>&1; then
    echo "Fehler: Hugo Dev-Server läuft nicht auf $BASE_URL"
    exit 1
fi

echo ""
echo -e "${BOLD}Link-Check für kidslab.de${NC}"
echo "========================="
echo ""

# Schritt 1: Alle Seiten-URLs vom Sitemap holen
echo "Sammle alle Seiten von der Sitemap..."
PAGES=$(curl -s "$BASE_URL/sitemap.xml" | sed -n 's/.*<loc>\([^<]*\)<\/loc>.*/\1/p' | sed "s|https://kidslab.de|$BASE_URL|g")
PAGE_COUNT=$(echo "$PAGES" | wc -l | tr -d ' ')
echo "Gefunden: $PAGE_COUNT Seiten"
echo ""

# CSV Header
echo "Quelle,Link,Typ,HTTP-Code,Status" > "$OUTPUT_CSV"

# Temporäre Dateien
all_links=$(mktemp)
checked_cache=$(mktemp)
ok=0
broken=0
redirect=0
skipped=0
total=0

# Schritt 2: Von jeder Seite alle Links extrahieren
echo "Extrahiere Links von allen Seiten..."
echo "$PAGES" | while read -r page_url; do
    # Relativen Pfad für Anzeige
    page_path=$(echo "$page_url" | sed "s|$BASE_URL||")
    [ -z "$page_path" ] && page_path="/"

    # HTML holen und alle href/src Links extrahieren
    curl -s "$page_url" | grep -oE '(href|src)="[^"]*"' | sed 's/.*="\([^"]*\)"/\1/' | while read -r link; do
        # Überspringen: Anker, JavaScript, leere, data:, livereload, #
        case "$link" in
            \#*|javascript:*|data:*|mailto:*|tel:*|""|/livereload*) continue ;;
        esac

        echo "${page_path}|${link}"
    done
done | sort -u > "$all_links"

TOTAL_LINKS=$(wc -l < "$all_links" | tr -d ' ')
echo "Gefunden: $TOTAL_LINKS einzigartige Links"
echo ""
echo "Prüfe Links..."
echo ""

# Schritt 3: Jeden Link prüfen
current=0
while IFS='|' read -r source link; do
    current=$((current + 1))

    # Link-Typ bestimmen
    if echo "$link" | grep -qE '^https?://'; then
        link_type="extern"
        check_url="$link"
    elif echo "$link" | grep -qE '^/'; then
        link_type="intern"
        check_url="${BASE_URL}${link}"
    else
        # Relativer Link
        link_type="relativ"
        check_url="${BASE_URL}${source}${link}"
    fi

    # Cache prüfen (gleichen Link nicht doppelt checken)
    cache_key=$(echo "$check_url" | md5 -q 2>/dev/null || echo "$check_url" | md5sum | cut -d' ' -f1)
    cached_result=$(grep "^${cache_key}|" "$checked_cache" 2>/dev/null | head -1)

    if [ -n "$cached_result" ]; then
        http_code=$(echo "$cached_result" | cut -d'|' -f2)
    else
        # HTTP-Request (mit Timeout, ohne Redirect folgen für Status)
        if [ "$link_type" = "extern" ]; then
            http_code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 --connect-timeout 5 "$check_url" 2>/dev/null)
        else
            http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$check_url" 2>/dev/null)
        fi
        echo "${cache_key}|${http_code}" >> "$checked_cache"
    fi

    # Status bestimmen
    case "$http_code" in
        200) status="OK" ;;
        301|302|303|307|308) status="REDIRECT" ;;
        404) status="BROKEN" ;;
        000) status="TIMEOUT" ;;
        403) status="FORBIDDEN" ;;
        *) status="ERROR" ;;
    esac

    # CSV schreiben
    echo "${source},${link},${link_type},${http_code},${status}" >> "$OUTPUT_CSV"

    # Nur Probleme anzeigen
    case "$status" in
        OK) ok=$((ok + 1)) ;;
        REDIRECT)
            redirect=$((redirect + 1))
            ;;
        BROKEN)
            broken=$((broken + 1))
            echo -e "${RED}✗ 404${NC}  ${source}  →  ${link}"
            ;;
        TIMEOUT)
            echo -e "${YELLOW}⏱ TIMEOUT${NC}  ${source}  →  ${link}"
            ;;
        FORBIDDEN)
            echo -e "${YELLOW}🚫 403${NC}  ${source}  →  ${link}"
            ;;
        *)
            echo -e "${YELLOW}? ${http_code}${NC}  ${source}  →  ${link}"
            ;;
    esac

    # Fortschritt alle 50 Links
    if [ $((current % 50)) -eq 0 ]; then
        echo -e "  ... ${current}/${TOTAL_LINKS} geprüft"
    fi

done < "$all_links"

# Zähler aus CSV berechnen (da Subshell-Problem)
ok=$(grep -c ",OK$" "$OUTPUT_CSV" 2>/dev/null; true)
broken=$(grep -c ",BROKEN$" "$OUTPUT_CSV" 2>/dev/null; true)
redirect=$(grep -c ",REDIRECT$" "$OUTPUT_CSV" 2>/dev/null; true)
timeout=$(grep -c ",TIMEOUT$" "$OUTPUT_CSV" 2>/dev/null; true)
forbidden=$(grep -c ",FORBIDDEN$" "$OUTPUT_CSV" 2>/dev/null; true)
errors=$(grep -c ",ERROR$" "$OUTPUT_CSV" 2>/dev/null; true)

echo ""
echo "========================="
echo -e "${BOLD}Zusammenfassung:${NC}"
echo -e "  ${GREEN}OK:${NC}        $ok"
echo -e "  ${YELLOW}Redirect:${NC}  $redirect"
echo -e "  ${RED}Broken:${NC}    $broken"
echo -e "  ${YELLOW}Timeout:${NC}   $timeout"
echo -e "  ${YELLOW}Forbidden:${NC} $forbidden"
echo -e "  ${YELLOW}Errors:${NC}    $errors"
echo ""

if [ "$broken" -gt 0 ]; then
    echo -e "${BOLD}Alle kaputten Links:${NC}"
    echo ""
    grep ",BROKEN$" "$OUTPUT_CSV" | while IFS=',' read -r source link typ code status; do
        echo "  $source  →  $link"
    done
fi

echo ""
echo "Ergebnisse gespeichert in: ${BOLD}${OUTPUT_CSV}${NC}"

# Aufräumen
rm -f "$all_links" "$checked_cache"
