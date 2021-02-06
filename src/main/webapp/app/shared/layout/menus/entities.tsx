import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/debito">
      <Translate contentKey="global.menu.entities.debito" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/imovel">
      <Translate contentKey="global.menu.entities.imovel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/endereco">
      <Translate contentKey="global.menu.entities.endereco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pessoa">
      <Translate contentKey="global.menu.entities.pessoa" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
