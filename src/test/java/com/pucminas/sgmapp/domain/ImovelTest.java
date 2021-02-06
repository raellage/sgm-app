package com.pucminas.sgmapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pucminas.sgmapp.web.rest.TestUtil;

public class ImovelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imovel.class);
        Imovel imovel1 = new Imovel();
        imovel1.setId(1L);
        Imovel imovel2 = new Imovel();
        imovel2.setId(imovel1.getId());
        assertThat(imovel1).isEqualTo(imovel2);
        imovel2.setId(2L);
        assertThat(imovel1).isNotEqualTo(imovel2);
        imovel1.setId(null);
        assertThat(imovel1).isNotEqualTo(imovel2);
    }
}
