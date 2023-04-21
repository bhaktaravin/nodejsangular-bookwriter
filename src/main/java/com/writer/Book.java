package com.writer;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "book")
public class Book {

	
	@Id
	static String bookId;
	public String dateCreated;
	public String lastCreated;
	public String lastChapterWorked;
	public String totalChapters;
	public Chapter chapter;
	
	public Book(String dateCreated, String lastCreated, String lastChapterWorked, String totalChapters, String content, Chapter chapter) {
		super();
		this.dateCreated = dateCreated;
		this.lastCreated = lastCreated;
		this.lastChapterWorked = lastChapterWorked;
		this.totalChapters = totalChapters;
		this.chapter = chapter;
		
	}

	public static String getBookId() {
		return bookId;
	}



	public static void setBookId(String bookId) {
		Book.bookId = bookId;
	}



	public String getDateCreated() {
		return dateCreated;
	}



	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}



	public String getLastCreated() {
		return lastCreated;
	}



	public void setLastCreated(String lastCreated) {
		this.lastCreated = lastCreated;
	}



	public String getLastChapterWorked() {
		return lastChapterWorked;
	}



	public void setLastChapterWorked(String lastChapterWorked) {
		this.lastChapterWorked = lastChapterWorked;
	}



	public String getTotalChapters() {
		return totalChapters;
	}



	public void setTotalChapters(String totalChapters) {
		this.totalChapters = totalChapters;
	}

	
	

	
	public Chapter getChapter() {
		return chapter;
	}

	public void setChapter(Chapter chapter) {
		this.chapter = chapter;
	}
	
	
	
	
}

@Document(collection = "chapter")
class Chapter{

	@Id
	private String chapterId;
	
	@Field("chapter")
	private String bookId = Book.bookId;
	
	private String chapterContent;
	
	public Chapter(String chapterId, String bookId, String chapterContent) {
		this.chapterId = chapterId;
		this.bookId = bookId;
		this.chapterContent = chapterContent;
	}

	public String getChapterId() {
		return chapterId;
	}

	public void setChapterId(String chapterId) {
		this.chapterId = chapterId;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getChapterContent() {
		return chapterContent;
	}

	public void setChapterContent(String chapterContent) {
		this.chapterContent = chapterContent;
	}

	@Override
	public String toString() {
		return "Chapter [chapterId=" + chapterId + ", bookId=" + bookId + ", chapterContent=" + chapterContent
				+ "]";
	}

	
	
}