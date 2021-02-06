import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Debito from './debito';
import Imovel from './imovel';
import Endereco from './endereco';
import Pessoa from './pessoa';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}debito`} component={Debito} />
      <ErrorBoundaryRoute path={`${match.url}imovel`} component={Imovel} />
      <ErrorBoundaryRoute path={`${match.url}endereco`} component={Endereco} />
      <ErrorBoundaryRoute path={`${match.url}pessoa`} component={Pessoa} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
