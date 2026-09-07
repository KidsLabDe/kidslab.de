# kg/ – RAG-Wissensbasis für das KidsLab

Enthält die strukturierte Wissensbasis aus kidslab.de (215 Seiten → 27 Chunks)
als Eingabe für eine Retrieval-Augmented-Generation (RAG)-Pipeline.

## Dateien

| Datei | Zweck |
|-------|-------|
| `kidslab-wissen.md` | **Kern-Wissen**: Identity, Philosophie, Team, Kurse, GamesLab, Partner, FAQ |
| `blog-posts.md`     | **Chronik**: alle 93 Blog-Posts (2019–2026) als Datums-Tabelle |
| `rag_chunk.py`      | **Chunker-Script**: macht Markdown → JSON + optionale Embeddings |
| `chunks.json`       | Chunk-Basis (14 Core + 13 Blog-Abschnitte) mit Metadaten |
| `chunks.txt`        | Flacher Text für einfache Embedding-Konnektoren (Llama, Mistral…) |
| `embeddings.json`   | Embeddings (nach `--embed`), dim=384 |

## Schnellstart (nur Chunking)

```bash
python3 kg/rag_chunk.py
# → kg/chunks.json + kg/chunks.txt erzeugt
```

## Embeddings + Suche (Optional)

```bash
pip3 install sentence-transformers
python3 kg/rag_chunk.py --embed                # lädt all-MiniLM-L6-v2 (~150 MB)
python3 kg/rag_chunk.py --search "Wer ist Gregor Walter?"
```

Das Modell wird von HuggingFace automatisch geladen & gecacht.

## Verwendungsbeispiel in einem RAG-System

Python (mit `sentence-transformers`):

```python
import json
from sentence_transformers import SentenceTransformer

kb = json.load(open("kg/chunks.json"))
emb = json.load(open("kg/embeddings.json"))
model = SentenceTransformer(emb["model"])

ids = [c["id"] for c in kb["chunks"]]
vec_by_id = {c["id"]: c["vector"] for c in emb["chunks"]}

def search(queries, top_k=5):
    qv = model.encode(queries, normalize_embeddings=True)
    scored = []
    for vid, v in vec_by_id.items():
        import numpy as np
        score = float(np.dot(qv[0] if isinstance(qv, list) and len(qv) > 1 else qv, np.array(v)))
        scored.append((score, vid))
    scored.sort(reverse=True)
    return [next(c for c in kb["chunks"] if c["id"] == vid) for s, vid in scored[:top_k]]

print(search(["Wie teuer ist ein Kurs?"]))
```

## Chunk-Strategie

- **Trennung** an H1/H2/H3 → 27 Chunks (Durchschnitt ~500–900 Wörter).
- **Metadaten pro Chunk**: id, source (core|blog), section (erste Zeile), word_count, created.
- **Embedding-Text** pro Chunk: `section + content[:500]` (gut für all-MiniLM, 256-Token-Context).
- **Kürzlich ergänzt**: `blog-posts.md` als chronologische Timeline; ideal für Zeitfragen ("Wann wurde GamesLab gestartet?" → 2024).

## Qualitätstipps

1. **Gröbere Granularität** für FAQ-Queries: `--embed` + `chunk_size=600` übergeben.
2. **Feinere Granularität** für Blog-Details: Trenne auch an `|`-Tabellenzeilen.
3. **Längere Kontexte**: Bei Modellen mit 8k+ Context (BGE-Large, text-embedding-3) die volle `content`-Länge verwenden.
