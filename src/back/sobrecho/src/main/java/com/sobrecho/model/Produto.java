package com.sobrecho.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "produto")
public class Produto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long IdProduto;

	private String nomeProduto;
	
	@Min(1)
	@Max(99)
	private int quantidade;
	private double preco;
	
	@Size(min = 1, max = 5)
	private String tamanho;
	
	private String cor;

	@OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Imagem> imagens = new ArrayList<>();

	// Getters e Setters
	public Long getIdProduto() {
		return IdProduto;
	}

	public void setIdProduto(Long idProduto) {
		IdProduto = idProduto;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	public String getTamanho() {
		return tamanho;
	}

	public void setTamanho(String tamanho) {
		this.tamanho = tamanho;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public List<Imagem> getImagens() {
		return imagens;
	}

	public void setImagens(List<Imagem> imagens) {
		this.imagens = imagens;
	}

	@Override
	public int hashCode() {
		return Objects.hash(IdProduto, cor, nomeProduto, preco, quantidade, tamanho, imagens);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Produto other = (Produto) obj;
		return Objects.equals(IdProduto, other.IdProduto) && Objects.equals(cor, other.cor)
				&& Objects.equals(nomeProduto, other.nomeProduto)
				&& Double.doubleToLongBits(preco) == Double.doubleToLongBits(other.preco)
				&& quantidade == other.quantidade && Objects.equals(tamanho, other.tamanho)
				&& Objects.equals(imagens, other.imagens);
	}
}