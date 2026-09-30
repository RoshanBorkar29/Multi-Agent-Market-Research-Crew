import os
import logging
from functools import lru_cache
from langchain_community.embeddings import HuggingFaceEmbeddings

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def get_embeddings_model():
    """
    Returns a cached instance of the 768-dimensional HuggingFace embeddings model
    matching Vector(768) in ReportEmbedding model.
    """
    logger.info("Initializing HuggingFace sentence-transformers embeddings (all-mpnet-base-v2)...")
    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-mpnet-base-v2",
        model_kwargs={"device": "cpu"}
    )
