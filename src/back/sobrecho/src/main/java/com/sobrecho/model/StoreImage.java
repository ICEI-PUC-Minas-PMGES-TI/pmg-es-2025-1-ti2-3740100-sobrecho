package com.sobrecho.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.google.firebase.database.annotations.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "storeImage")
public class StoreImage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;
	
	@NotBlank(message = "O nome da imagem não pode estar vazio")
    @Column(name = "url", unique = true)
    @NotNull
    @NotEmpty
    private String url;
	
	 @ManyToOne
	 @JoinColumn(name = "store_id", nullable = false)
	 @JsonBackReference
	 private Store store;
	 
	 public StoreImage() { 
	 }

	public StoreImage(Long id, @NotBlank(message = "O nome da imagem não pode estar vazio") @NotEmpty String url,
			Store store) {
		super();
		this.id = id;
		this.url = url;
		this.store = store;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, store, url);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StoreImage other = (StoreImage) obj;
		return Objects.equals(id, other.id) && Objects.equals(store, other.store) && Objects.equals(url, other.url);
	}
	 
	 

}
