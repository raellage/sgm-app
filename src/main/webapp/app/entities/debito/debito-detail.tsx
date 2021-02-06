import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './debito.reducer';
import { IDebito } from 'app/shared/model/debito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDebitoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DebitoDetail = (props: IDebitoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { debitoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgmApp.debito.detail.title">Debito</Translate> [<b>{debitoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="anoReferencia">
              <Translate contentKey="sgmApp.debito.anoReferencia">Ano Referencia</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.anoReferencia}</dd>
          <dt>
            <span id="valor">
              <Translate contentKey="sgmApp.debito.valor">Valor</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.valor}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="sgmApp.debito.status">Status</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.status}</dd>
          <dt>
            <Translate contentKey="sgmApp.debito.imovel">Imovel</Translate>
          </dt>
          <dd>{debitoEntity.imovel ? debitoEntity.imovel.numeroCadastro : ''}</dd>
        </dl>
        <Button tag={Link} to="/debito" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/debito/${debitoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ debito }: IRootState) => ({
  debitoEntity: debito.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DebitoDetail);
