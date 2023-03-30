package com.example.server.service.card;


import com.example.server.model.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long> {

}
