import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './debito.reducer';
import { IDebito } from 'app/shared/model/debito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDebitoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Debito = (props: IDebitoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { debitoList, match, loading } = props;
  return (
    <div>
      <h2 id="debito-heading">
        <Translate contentKey="sgmApp.debito.home.title">Debitos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sgmApp.debito.home.createLabel">Create new Debito</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {debitoList && debitoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.debito.anoReferencia">Ano Referencia</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.debito.valor">Valor</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.debito.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.debito.imovel">Imovel</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {debitoList.map((debito, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${debito.id}`} color="link" size="sm">
                      {debito.id}
                    </Button>
                  </td>
                  <td>{debito.anoReferencia}</td>
                  <td>{debito.valor}</td>
                  <td>
                    <Translate contentKey={`sgmApp.StatusDebito.${debito.status}`} />
                  </td>
                  <td>{debito.imovel ? <Link to={`imovel/${debito.imovel.id}`}>{debito.imovel.numeroCadastro}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${debito.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${debito.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${debito.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sgmApp.debito.home.notFound">No Debitos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ debito }: IRootState) => ({
  debitoList: debito.entities,
  loading: debito.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Debito);
