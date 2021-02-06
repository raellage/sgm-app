package com.pucminas.sgmapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.pucminas.sgmapp.domain.enumeration.StatusDebito;

/**
 * A Debito.
 */
@Entity
@Table(name = "debito")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Debito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "ano_referencia", nullable = false)
    private Integer anoReferencia;

    @NotNull
    @Column(name = "valor", nullable = false)
    private Float valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusDebito status;

    @ManyToOne
    @JsonIgnoreProperties(value = "debitos", allowSetters = true)
    private Imovel imovel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnoReferencia() {
        return anoReferencia;
    }

    public Debito anoReferencia(Integer anoReferencia) {
        this.anoReferencia = anoReferencia;
        return this;
    }

    public void setAnoReferencia(Integer anoReferencia) {
        this.anoReferencia = anoReferencia;
    }

    public Float getValor() {
        return valor;
    }

    public Debito valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public StatusDebito getStatus() {
        return status;
    }

    public Debito status(StatusDebito status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusDebito status) {
        this.status = status;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public Debito imovel(Imovel imovel) {
        this.imovel = imovel;
        return this;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Debito)) {
            return false;
        }
        return id != null && id.equals(((Debito) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Debito{" +
            "id=" + getId() +
            ", anoReferencia=" + getAnoReferencia() +
            ", valor=" + getValor() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
