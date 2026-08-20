#!/usr/bin/env python3
"""
KidsLab RAG-Chunker

Liest kidslab-wissen.md + blog-posts.md und erzeugt:
  - kg/chunks.json        (strukturierte Chunks mit Metadaten)
  - kg/chunks.txt         (flacher Text für einfache Embeddings)
  - kg/embeddings.json    (Embeddings via Huggingface sentence-transformers)

Aufruf:
  python3 kg/rag_chunk.py                    # nur Chunking
  python3 kg/rag_chunk.py --embed            # + Embeddings (lädt ~150MB Modell)
  python3 kg/rag_chunk.py --search "frage"   # Suchtest nach Embeddings
"""

import json
import re
import sys
from pathlib import Path
from datetime import datetime, UTC

HERE = Path(__file__).parent
SRC = {
    "core": HERE / "kidslab-wissen.md",
    "blog": HERE / "blog-posts.md",
}
OUT_JSON = HERE / "chunks.json"
OUT_TXT = HERE / "chunks.txt"
OUT_EMB = HERE / "embeddings.json"

MODEL = "sentence-transformers/all-MiniLM-L6-v2"


def chunk_markdown(src: Path, source: str) -> list[dict]:
    """Schneller Markdown-Chunker:
    - trennt an H1/H2/H3
    - Merkt Abschnitt + Source + Index
    """
    text = src.read_text(encoding="utf-8")
    chunks = []
    # Trennt an H1/H2/H3 (### = h3, ## = h2, # = h1)
    sections = re.split(r"(?m)^#{1,3}\s+", text)
    for i, sec in enumerate(sections):
        sec = sec.strip()
        if not sec or len(sec) < 40:
            continue
        # Titel = erste Zeile
        first = sec.splitlines()[0].strip().rstrip("#").strip()
        chunks.append(
            {
                "id": f"{source}-{i:03d}",
                "source": source,
                "section": first[:120],
                "content": sec,
                "word_count": len(sec.split()),
                "length_chars": len(sec),
                "created": datetime.now(UTC).isoformat(timespec="seconds"),
            }
        )
    return chunks


def main(argv: list[str]) -> int:
    want_embed = "--embed" in argv
    query = argv[argv.index("--search") + 1] if "--search" in argv else None

    core = chunk_markdown(SRC["core"], "core")
    blog = chunk_markdown(SRC["blog"], "blog")
    all_chunks = core + blog
    print(f"Gefunden: {len(core)} Core-Abschnitte, {len(blog)} Blog-Abschnitte.")

    OUT_JSON.write_text(
        json.dumps(
            {
                "meta": {
                    "generated": datetime.now(UTC).isoformat(timespec="seconds"),
                    "sources": [str(SRC["core"].relative_to(HERE.parent)), str(SRC["blog"].relative_to(HERE.parent))],
                    "chunk_count": len(all_chunks),
                },
                "chunks": all_chunks,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Wrote {OUT_JSON} ({len(all_chunks)} Chunks)")

    with OUT_TXT.open("w", encoding="utf-8") as f:
        for c in all_chunks:
            f.write(f"[{c['id']}]\n{c['content']}\n\n")
    print(f"Wrote {OUT_TXT}")

    if want_embed:
        try:
            from sentence_transformers import SentenceTransformer  # type: ignore
        except ImportError:
            print("\n[!] sentence-transformers fehlt. Installiere:")
            print("    pip3 install sentence-transformers")
            return 1

        print(f"\nLade Embeddings-Modell: {MODEL} (kann 1-2 Min dauern)…")
        model = SentenceTransformer(MODEL)
        texts = [
            f"{c['section']}\n\n{c['content'][:500]}"
            for c in all_chunks
        ]
        vecs = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)
        OUT_EMB.write_text(
            json.dumps(
                {
                    "model": MODEL,
                    "dim": vecs.shape[1],
                    "chunks": [
                        {"id": c["id"], "vector": vecs[i].tolist()}
                        for i, c in enumerate(all_chunks)
                    ],
                },
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        print(f"Wrote {OUT_EMB} (dim={vecs.shape[1]})")

        if query:
            import numpy as np

            mat = np.array([e["vector"] for e in json.loads(OUT_EMB.read_text())["chunks"]])
            qvec = model.encode(query, normalize_embeddings=True)
            scores = (mat @ qvec)
            order = np.argsort(-scores)
            print(f"\nTop-5 Treffer für: {query!r}")
            for rank, idx in enumerate(order[:5], 1):
                c = all_chunks[idx]
                print(f"  {rank}. [{c['id']}] score={scores[idx]:.3f}")
                print(f"     Abschnitt: {c['section']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
