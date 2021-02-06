package com.pucminas.sgmapp.web.rest;

import com.pucminas.sgmapp.SgmApp;
import com.pucminas.sgmapp.domain.Imovel;
import com.pucminas.sgmapp.repository.ImovelRepository;

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

import com.pucminas.sgmapp.domain.enumeration.ZonaImovel;
import com.pucminas.sgmapp.domain.enumeration.TipoImovel;
/**
 * Integration tests for the {@link ImovelResource} REST controller.
 */
@SpringBootTest(classes = SgmApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ImovelResourceIT {

    private static final String DEFAULT_NUMERO_CADASTRO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CADASTRO = "BBBBBBBBBB";

    private static final Integer DEFAULT_LARGURA = 1;
    private static final Integer UPDATED_LARGURA = 2;

    private static final Integer DEFAULT_COMPRIMENTO = 1;
    private static final Integer UPDATED_COMPRIMENTO = 2;

    private static final Integer DEFAULT_AREA = 1;
    private static final Integer UPDATED_AREA = 2;

    private static final ZonaImovel DEFAULT_ZONA = ZonaImovel.RURAL;
    private static final ZonaImovel UPDATED_ZONA = ZonaImovel.URBANA;

    private static final TipoImovel DEFAULT_TIPO = TipoImovel.CASA;
    private static final TipoImovel UPDATED_TIPO = TipoImovel.APARTAMENTO;

    private static final String DEFAULT_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUDE = "BBBBBBBBBB";

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restImovelMockMvc;

    private Imovel imovel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Imovel createEntity(EntityManager em) {
        Imovel imovel = new Imovel()
            .numeroCadastro(DEFAULT_NUMERO_CADASTRO)
            .largura(DEFAULT_LARGURA)
            .comprimento(DEFAULT_COMPRIMENTO)
            .area(DEFAULT_AREA)
            .zona(DEFAULT_ZONA)
            .tipo(DEFAULT_TIPO)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE);
        return imovel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Imovel createUpdatedEntity(EntityManager em) {
        Imovel imovel = new Imovel()
            .numeroCadastro(UPDATED_NUMERO_CADASTRO)
            .largura(UPDATED_LARGURA)
            .comprimento(UPDATED_COMPRIMENTO)
            .area(UPDATED_AREA)
            .zona(UPDATED_ZONA)
            .tipo(UPDATED_TIPO)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);
        return imovel;
    }

    @BeforeEach
    public void initTest() {
        imovel = createEntity(em);
    }

    @Test
    @Transactional
    public void createImovel() throws Exception {
        int databaseSizeBeforeCreate = imovelRepository.findAll().size();
        // Create the Imovel
        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isCreated());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeCreate + 1);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getNumeroCadastro()).isEqualTo(DEFAULT_NUMERO_CADASTRO);
        assertThat(testImovel.getLargura()).isEqualTo(DEFAULT_LARGURA);
        assertThat(testImovel.getComprimento()).isEqualTo(DEFAULT_COMPRIMENTO);
        assertThat(testImovel.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testImovel.getZona()).isEqualTo(DEFAULT_ZONA);
        assertThat(testImovel.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testImovel.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testImovel.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void createImovelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imovelRepository.findAll().size();

        // Create the Imovel with an existing ID
        imovel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNumeroCadastroIsRequired() throws Exception {
        int databaseSizeBeforeTest = imovelRepository.findAll().size();
        // set the field null
        imovel.setNumeroCadastro(null);

        // Create the Imovel, which fails.


        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllImovels() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        // Get all the imovelList
        restImovelMockMvc.perform(get("/api/imovels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imovel.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroCadastro").value(hasItem(DEFAULT_NUMERO_CADASTRO)))
            .andExpect(jsonPath("$.[*].largura").value(hasItem(DEFAULT_LARGURA)))
            .andExpect(jsonPath("$.[*].comprimento").value(hasItem(DEFAULT_COMPRIMENTO)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA)))
            .andExpect(jsonPath("$.[*].zona").value(hasItem(DEFAULT_ZONA.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE)));
    }
    
    @Test
    @Transactional
    public void getImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        // Get the imovel
        restImovelMockMvc.perform(get("/api/imovels/{id}", imovel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(imovel.getId().intValue()))
            .andExpect(jsonPath("$.numeroCadastro").value(DEFAULT_NUMERO_CADASTRO))
            .andExpect(jsonPath("$.largura").value(DEFAULT_LARGURA))
            .andExpect(jsonPath("$.comprimento").value(DEFAULT_COMPRIMENTO))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA))
            .andExpect(jsonPath("$.zona").value(DEFAULT_ZONA.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE));
    }
    @Test
    @Transactional
    public void getNonExistingImovel() throws Exception {
        // Get the imovel
        restImovelMockMvc.perform(get("/api/imovels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        int databaseSizeBeforeUpdate = imovelRepository.findAll().size();

        // Update the imovel
        Imovel updatedImovel = imovelRepository.findById(imovel.getId()).get();
        // Disconnect from session so that the updates on updatedImovel are not directly saved in db
        em.detach(updatedImovel);
        updatedImovel
            .numeroCadastro(UPDATED_NUMERO_CADASTRO)
            .largura(UPDATED_LARGURA)
            .comprimento(UPDATED_COMPRIMENTO)
            .area(UPDATED_AREA)
            .zona(UPDATED_ZONA)
            .tipo(UPDATED_TIPO)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);

        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedImovel)))
            .andExpect(status().isOk());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getNumeroCadastro()).isEqualTo(UPDATED_NUMERO_CADASTRO);
        assertThat(testImovel.getLargura()).isEqualTo(UPDATED_LARGURA);
        assertThat(testImovel.getComprimento()).isEqualTo(UPDATED_COMPRIMENTO);
        assertThat(testImovel.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testImovel.getZona()).isEqualTo(UPDATED_ZONA);
        assertThat(testImovel.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testImovel.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testImovel.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingImovel() throws Exception {
        int databaseSizeBeforeUpdate = imovelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        int databaseSizeBeforeDelete = imovelRepository.findAll().size();

        // Delete the imovel
        restImovelMockMvc.perform(delete("/api/imovels/{id}", imovel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
