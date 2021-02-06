package com.pucminas.sgmapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.pucminas.sgmapp.domain.enumeration.ZonaImovel;

import com.pucminas.sgmapp.domain.enumeration.TipoImovel;

/**
 * A Imovel.
 */
@Entity
@Table(name = "imovel")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Imovel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "numero_cadastro", nullable = false, unique = true)
    private Integer numeroCadastro;

    @Column(name = "largura")
    private Integer largura;

    @Column(name = "comprimento")
    private Integer comprimento;

    @Column(name = "area")
    private Integer area;

    @Enumerated(EnumType.STRING)
    @Column(name = "zona")
    private ZonaImovel zona;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoImovel tipo;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroCadastro() {
        return numeroCadastro;
    }

    public Imovel numeroCadastro(Integer numeroCadastro) {
        this.numeroCadastro = numeroCadastro;
        return this;
    }

    public void setNumeroCadastro(Integer numeroCadastro) {
        this.numeroCadastro = numeroCadastro;
    }

    public Integer getLargura() {
        return largura;
    }

    public Imovel largura(Integer largura) {
        this.largura = largura;
        return this;
    }

    public void setLargura(Integer largura) {
        this.largura = largura;
    }

    public Integer getComprimento() {
        return comprimento;
    }

    public Imovel comprimento(Integer comprimento) {
        this.comprimento = comprimento;
        return this;
    }

    public void setComprimento(Integer comprimento) {
        this.comprimento = comprimento;
    }

    public Integer getArea() {
        return area;
    }

    public Imovel area(Integer area) {
        this.area = area;
        return this;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public ZonaImovel getZona() {
        return zona;
    }

    public Imovel zona(ZonaImovel zona) {
        this.zona = zona;
        return this;
    }

    public void setZona(ZonaImovel zona) {
        this.zona = zona;
    }

    public TipoImovel getTipo() {
        return tipo;
    }

    public Imovel tipo(TipoImovel tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoImovel tipo) {
        this.tipo = tipo;
    }

    public String getLatitude() {
        return latitude;
    }

    public Imovel latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public Imovel longitude(String longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Imovel endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Imovel)) {
            return false;
        }
        return id != null && id.equals(((Imovel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Imovel{" +
            "id=" + getId() +
            ", numeroCadastro=" + getNumeroCadastro() +
            ", largura=" + getLargura() +
            ", comprimento=" + getComprimento() +
            ", area=" + getArea() +
            ", zona='" + getZona() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", longitude='" + getLongitude() + "'" +
            "}";
    }
}
