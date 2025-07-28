from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .rag_pipeline import retrieve_context, generate_block

router = APIRouter()

class AugmentRequest(BaseModel):
    page_url: str
    gap_query: str
    block_types: list[str] = ["faq", "mythfact", "howto"]

@router.post("/augment")
def augment(req: AugmentRequest):
    context = retrieve_context(req.gap_query)
    results = {}
    for bt in req.block_types:
        try:
            results[bt] = generate_block(bt, req.gap_query, context)
        except Exception as e:
            raise HTTPException(500, f"Error generating {bt}: {e}")
    return {"page_url": req.page_url, "augmentations": results}