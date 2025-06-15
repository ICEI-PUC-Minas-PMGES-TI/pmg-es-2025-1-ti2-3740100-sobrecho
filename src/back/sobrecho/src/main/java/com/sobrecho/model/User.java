package com.sobrecho.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sobrecho.enums.DocumentType;
import com.sobrecho.enums.ProfileEnum;

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

	@Column(name = "phone")
	private String phone;

	@Column(name = "birthdate")
	private java.time.LocalDate birthdate;

	@CreationTimestamp
	@Column(name = "created_at")
	private Instant createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private Instant updatedAt;

	@Column(name = "profile", nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_profile")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Set<Integer> profiles = new HashSet<>(Arrays.asList(ProfileEnum.USER.getCode()));


	@OneToMany(mappedBy = "user")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private List<Product> products = new ArrayList<Product>();

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference // Define este como o lado "pai" da serialização
	private Store store;

	public Store getStore() {
		return this.store;
	}

	public User() {
	}

	public User(Long id, @NotNull @NotEmpty @Size(min = 2, max = 100) String name, @NotNull @NotEmpty String email,
			@Size(min = 11, max = 14) String documentNumber, DocumentType documentType, String addressLine,
			String country, String state, @Size(max = 30) String zipCode, String password, Instant createdAt,
			Instant updatedAt) {
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
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
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

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public List<Product> getProducts() {
        return products;
    }

	public String getUsername() {
		return this.email;
	}

	public Set<ProfileEnum> getProfiles() {
        return this.profiles.stream().map(x -> ProfileEnum.toEnum(x)).collect(Collectors.toSet());
    }

    public void addProfile(ProfileEnum profileEnum) {
        this.profiles.add(profileEnum.getCode());
    }

	public void setProfiles(Set<Integer> profiles) {
		this.profiles = profiles;
	}

	
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public java.time.LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(java.time.LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", documentNumber=" + documentNumber
				+ ", documentType=" + documentType + ", addressLine=" + addressLine + ", country=" + country
				+ ", state=" + state + ", zipCode=" + zipCode + ", password=" + password + ", createdAt=" + createdAt
				+ ", updatedAt=" + updatedAt + ", profiles=" + profiles + "]";
	}
}