package com.pucminas.sgmapp.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String SERVIDOR_PUBLICO = "ROLE_SERVIDOR_PUBLICO";

    public static final String PRESTADOR = "ROLE_PRESTADOR";

    public static final String CIDADAO = "ROLE_CIDADAO";

    private AuthoritiesConstants() {
    }
}
