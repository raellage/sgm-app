import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './imovel.reducer';
import { IImovel } from 'app/shared/model/imovel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImovelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ImovelDetail = (props: IImovelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { imovelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgmApp.imovel.detail.title">Imovel</Translate> [<b>{imovelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="numeroCadastro">
              <Translate contentKey="sgmApp.imovel.numeroCadastro">Numero Cadastro</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.numeroCadastro}</dd>
          <dt>
            <span id="largura">
              <Translate contentKey="sgmApp.imovel.largura">Largura</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.largura}</dd>
          <dt>
            <span id="comprimento">
              <Translate contentKey="sgmApp.imovel.comprimento">Comprimento</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.comprimento}</dd>
          <dt>
            <span id="area">
              <Translate contentKey="sgmApp.imovel.area">Area</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.area}</dd>
          <dt>
            <span id="zona">
              <Translate contentKey="sgmApp.imovel.zona">Zona</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.zona}</dd>
          <dt>
            <span id="tipo">
              <Translate contentKey="sgmApp.imovel.tipo">Tipo</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.tipo}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="sgmApp.imovel.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="sgmApp.imovel.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{imovelEntity.longitude}</dd>
          <dt>
            <Translate contentKey="sgmApp.imovel.endereco">Endereco</Translate>
          </dt>
          <dd>{imovelEntity.endereco ? imovelEntity.endereco.cep : ''}</dd>
        </dl>
        <Button tag={Link} to="/imovel" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/imovel/${imovelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ imovel }: IRootState) => ({
  imovelEntity: imovel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImovelDetail);
