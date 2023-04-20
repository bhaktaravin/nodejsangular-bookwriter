package com.writer;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book,String>{
	
	Optional<Book> findById(String id);

}
