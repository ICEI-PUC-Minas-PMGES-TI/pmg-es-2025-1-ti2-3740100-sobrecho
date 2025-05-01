package com.sobrecho.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sobrecho.enums.DocumentType;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;

	@Column(name = "name", nullable = false)
	@NotNull()
	@NotEmpty()
	@Size(min = 2, max = 100)
	private String name;

	@Column(name = "email", nullable = false, unique = true)
	@NotNull()
	@NotEmpty()
	private String email;

	@Column(name = "document_number", unique = true)
	@Size(min = 11, max = 14)
	private String documentNumber;

	@Column(name = "document_type")
	@Enumerated(EnumType.ORDINAL)
    private DocumentType documentType;

	@Column(name = "address_line")
	private String addressLine;

	@Column(name = "country")
	private String country;

	@Column(name = "state")
	private String state;

	@Column(name = "zipCode")
	@Size(max = 30)
	private String zipCode;

	@Column(name = "password")
	private String password;

	public User() {
	}

	public User(Long id, @NotNull @NotEmpty @Size(min = 2, max = 100) String name, @NotNull @NotEmpty String email,
			@Size(min = 11, max = 14) String documentNumber, DocumentType documentType, String addressLine,
			String country, String state, @Size(max = 30) String zipCode, String password) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.documentNumber = documentNumber;
		this.documentType = documentType;
		this.addressLine = addressLine;
		this.country = country;
		this.state = state;
		this.zipCode = zipCode;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDocumentNumber() {
		return documentNumber;
	}

	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}

	public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}

	public String getAddressLine() {
		return addressLine;
	}

	public void setAddressLine(String addressLine) {
		this.addressLine = addressLine;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.id);
        hash = 37 * hash + Objects.hashCode(this.name);
        hash = 37 * hash + Objects.hashCode(this.email);
        hash = 37 * hash + Objects.hashCode(this.documentNumber);
        hash = 37 * hash + Objects.hashCode(this.documentType);
        hash = 37 * hash + Objects.hashCode(this.addressLine);
        hash = 37 * hash + Objects.hashCode(this.country);
        hash = 37 * hash + Objects.hashCode(this.state);
        hash = 37 * hash + Objects.hashCode(this.zipCode);
        hash = 37 * hash + Objects.hashCode(this.password);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User other = (User) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.email, other.email)) {
            return false;
        }
        if (!Objects.equals(this.documentNumber, other.documentNumber)) {
            return false;
        }
        if (!Objects.equals(this.addressLine, other.addressLine)) {
            return false;
        }
        if (!Objects.equals(this.country, other.country)) {
            return false;
        }
        if (!Objects.equals(this.state, other.state)) {
            return false;
        }
        if (!Objects.equals(this.zipCode, other.zipCode)) {
            return false;
        }
        if (!Objects.equals(this.password, other.password)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return this.documentType == other.documentType;
    }

	
}