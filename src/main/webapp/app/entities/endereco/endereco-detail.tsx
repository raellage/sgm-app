import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnderecoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnderecoDetail = (props: IEnderecoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { enderecoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgmApp.endereco.detail.title">Endereco</Translate> [<b>{enderecoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cep">
              <Translate contentKey="sgmApp.endereco.cep">Cep</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.cep}</dd>
          <dt>
            <span id="cidade">
              <Translate contentKey="sgmApp.endereco.cidade">Cidade</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.cidade}</dd>
          <dt>
            <span id="bairro">
              <Translate contentKey="sgmApp.endereco.bairro">Bairro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.bairro}</dd>
          <dt>
            <span id="logradouro">
              <Translate contentKey="sgmApp.endereco.logradouro">Logradouro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.logradouro}</dd>
          <dt>
            <span id="numero">
              <Translate contentKey="sgmApp.endereco.numero">Numero</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.numero}</dd>
          <dt>
            <span id="complemento">
              <Translate contentKey="sgmApp.endereco.complemento">Complemento</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.complemento}</dd>
        </dl>
        <Button tag={Link} to="/endereco" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/endereco/${enderecoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ endereco }: IRootState) => ({
  enderecoEntity: endereco.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoDetail);
