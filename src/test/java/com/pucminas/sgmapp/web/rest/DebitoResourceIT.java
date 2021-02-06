package com.pucminas.sgmapp.web.rest;

import com.pucminas.sgmapp.SgmApp;
import com.pucminas.sgmapp.domain.Debito;
import com.pucminas.sgmapp.repository.DebitoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pucminas.sgmapp.domain.enumeration.StatusDebito;
/**
 * Integration tests for the {@link DebitoResource} REST controller.
 */
@SpringBootTest(classes = SgmApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DebitoResourceIT {

    private static final Integer DEFAULT_ANO_REFERENCIA = 1;
    private static final Integer UPDATED_ANO_REFERENCIA = 2;

    private static final Float DEFAULT_VALOR = 1F;
    private static final Float UPDATED_VALOR = 2F;

    private static final StatusDebito DEFAULT_STATUS = StatusDebito.PENDENTE;
    private static final StatusDebito UPDATED_STATUS = StatusDebito.PAGO;

    @Autowired
    private DebitoRepository debitoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDebitoMockMvc;

    private Debito debito;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Debito createEntity(EntityManager em) {
        Debito debito = new Debito()
            .anoReferencia(DEFAULT_ANO_REFERENCIA)
            .valor(DEFAULT_VALOR)
            .status(DEFAULT_STATUS);
        return debito;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Debito createUpdatedEntity(EntityManager em) {
        Debito debito = new Debito()
            .anoReferencia(UPDATED_ANO_REFERENCIA)
            .valor(UPDATED_VALOR)
            .status(UPDATED_STATUS);
        return debito;
    }

    @BeforeEach
    public void initTest() {
        debito = createEntity(em);
    }

    @Test
    @Transactional
    public void createDebito() throws Exception {
        int databaseSizeBeforeCreate = debitoRepository.findAll().size();
        // Create the Debito
        restDebitoMockMvc.perform(post("/api/debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isCreated());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeCreate + 1);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getAnoReferencia()).isEqualTo(DEFAULT_ANO_REFERENCIA);
        assertThat(testDebito.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testDebito.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDebitoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = debitoRepository.findAll().size();

        // Create the Debito with an existing ID
        debito.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDebitoMockMvc.perform(post("/api/debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAnoReferenciaIsRequired() throws Exception {
        int databaseSizeBeforeTest = debitoRepository.findAll().size();
        // set the field null
        debito.setAnoReferencia(null);

        // Create the Debito, which fails.


        restDebitoMockMvc.perform(post("/api/debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = debitoRepository.findAll().size();
        // set the field null
        debito.setValor(null);

        // Create the Debito, which fails.


        restDebitoMockMvc.perform(post("/api/debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDebitos() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        // Get all the debitoList
        restDebitoMockMvc.perform(get("/api/debitos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(debito.getId().intValue())))
            .andExpect(jsonPath("$.[*].anoReferencia").value(hasItem(DEFAULT_ANO_REFERENCIA)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        // Get the debito
        restDebitoMockMvc.perform(get("/api/debitos/{id}", debito.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(debito.getId().intValue()))
            .andExpect(jsonPath("$.anoReferencia").value(DEFAULT_ANO_REFERENCIA))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDebito() throws Exception {
        // Get the debito
        restDebitoMockMvc.perform(get("/api/debitos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();

        // Update the debito
        Debito updatedDebito = debitoRepository.findById(debito.getId()).get();
        // Disconnect from session so that the updates on updatedDebito are not directly saved in db
        em.detach(updatedDebito);
        updatedDebito
            .anoReferencia(UPDATED_ANO_REFERENCIA)
            .valor(UPDATED_VALOR)
            .status(UPDATED_STATUS);

        restDebitoMockMvc.perform(put("/api/debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDebito)))
            .andExpect(status().isOk());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getAnoReferencia()).isEqualTo(UPDATED_ANO_REFERENCIA);
        assertThat(testDebito.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testDebito.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDebitoMockMvc.perform(put("/api/debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        int databaseSizeBeforeDelete = debitoRepository.findAll().size();

        // Delete the debito
        restDebitoMockMvc.perform(delete("/api/debitos/{id}", debito.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
