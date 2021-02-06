package com.pucminas.sgmapp.web.rest;

import com.pucminas.sgmapp.domain.Imovel;
import com.pucminas.sgmapp.repository.ImovelRepository;
import com.pucminas.sgmapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pucminas.sgmapp.domain.Imovel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ImovelResource {

    private final Logger log = LoggerFactory.getLogger(ImovelResource.class);

    private static final String ENTITY_NAME = "imovel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImovelRepository imovelRepository;

    public ImovelResource(ImovelRepository imovelRepository) {
        this.imovelRepository = imovelRepository;
    }

    /**
     * {@code POST  /imovels} : Create a new imovel.
     *
     * @param imovel the imovel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new imovel, or with status {@code 400 (Bad Request)} if the imovel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/imovels")
    public ResponseEntity<Imovel> createImovel(@Valid @RequestBody Imovel imovel) throws URISyntaxException {
        log.debug("REST request to save Imovel : {}", imovel);
        if (imovel.getId() != null) {
            throw new BadRequestAlertException("A new imovel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Imovel result = imovelRepository.save(imovel);
        return ResponseEntity.created(new URI("/api/imovels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /imovels} : Updates an existing imovel.
     *
     * @param imovel the imovel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated imovel,
     * or with status {@code 400 (Bad Request)} if the imovel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the imovel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/imovels")
    public ResponseEntity<Imovel> updateImovel(@Valid @RequestBody Imovel imovel) throws URISyntaxException {
        log.debug("REST request to update Imovel : {}", imovel);
        if (imovel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Imovel result = imovelRepository.save(imovel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, imovel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /imovels} : get all the imovels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of imovels in body.
     */
    @GetMapping("/imovels")
    public List<Imovel> getAllImovels() {
        log.debug("REST request to get all Imovels");
        return imovelRepository.findAll();
    }

    /**
     * {@code GET  /imovels/:id} : get the "id" imovel.
     *
     * @param id the id of the imovel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the imovel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/imovels/{id}")
    public ResponseEntity<Imovel> getImovel(@PathVariable Long id) {
        log.debug("REST request to get Imovel : {}", id);
        Optional<Imovel> imovel = imovelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(imovel);
    }

    /**
     * {@code DELETE  /imovels/:id} : delete the "id" imovel.
     *
     * @param id the id of the imovel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/imovels/{id}")
    public ResponseEntity<Void> deleteImovel(@PathVariable Long id) {
        log.debug("REST request to delete Imovel : {}", id);
        imovelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
