package com.writer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

	@Autowired
	BookRepository bookRepo;
	
	
	@GetMapping("/allBooks")
	public List<Book> getAll(){
		return bookRepo.findAll();
		
	}
	
	@PostMapping("/addBook")
	public Book createBook(@RequestBody Book book) {
		return bookRepo.save(book);
	}
	
	@GetMapping("/allBooks/{bookId}")
	public Optional<Book> getBookById(String id){
		return bookRepo.findById(id);
	}
}
