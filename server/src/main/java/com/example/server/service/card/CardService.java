package com.example.server.service.card;



import com.example.server.model.Card;

import java.util.List;

public interface CardService {
    Card addCard(Card card);
    List<Card> getAllCards();
    Card getCardById(Long id);
    String deleteCardById(Long id);
}
