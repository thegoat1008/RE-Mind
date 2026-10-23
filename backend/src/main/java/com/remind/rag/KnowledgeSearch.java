package com.remind.rag;

import java.util.List;

public interface KnowledgeSearch {
    List<Models.Knowledge> search(String query);
}
