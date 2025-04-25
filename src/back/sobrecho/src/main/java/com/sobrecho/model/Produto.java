package com.sobrecho.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

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
	
	@Size(min =1, max =5)
	private String tamanho;
	
	private String cor;
	private String nomeImagem;
	
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
	public String getNomeImagem() {
		return nomeImagem;
	}
	public void setNomeImagem(String nomeImagem) {
		this.nomeImagem = nomeImagem;
	}
	@Override
	public int hashCode() {
		return Objects.hash(IdProduto, cor, nomeImagem, nomeProduto, preco, quantidade, tamanho);
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
				&& Objects.equals(nomeImagem, other.nomeImagem) && Objects.equals(nomeProduto, other.nomeProduto)
				&& Double.doubleToLongBits(preco) == Double.doubleToLongBits(other.preco)
				&& quantidade == other.quantidade && Objects.equals(tamanho, other.tamanho);
	}
	
	
	
	
}

