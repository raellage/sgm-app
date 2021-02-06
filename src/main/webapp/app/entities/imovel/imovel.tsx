import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './imovel.reducer';
import { IImovel } from 'app/shared/model/imovel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImovelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Imovel = (props: IImovelProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { imovelList, match, loading } = props;
  return (
    <div>
      <h2 id="imovel-heading">
        <Translate contentKey="sgmApp.imovel.home.title">Imovels</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sgmApp.imovel.home.createLabel">Create new Imovel</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {imovelList && imovelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.numeroCadastro">Numero Cadastro</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.largura">Largura</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.comprimento">Comprimento</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.area">Area</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.zona">Zona</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.tipo">Tipo</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.latitude">Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.longitude">Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.imovel.endereco">Endereco</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {imovelList.map((imovel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${imovel.id}`} color="link" size="sm">
                      {imovel.id}
                    </Button>
                  </td>
                  <td>{imovel.numeroCadastro}</td>
                  <td>{imovel.largura}</td>
                  <td>{imovel.comprimento}</td>
                  <td>{imovel.area}</td>
                  <td>
                    <Translate contentKey={`sgmApp.ZonaImovel.${imovel.zona}`} />
                  </td>
                  <td>
                    <Translate contentKey={`sgmApp.TipoImovel.${imovel.tipo}`} />
                  </td>
                  <td>{imovel.latitude}</td>
                  <td>{imovel.longitude}</td>
                  <td>{imovel.endereco ? <Link to={`endereco/${imovel.endereco.id}`}>{imovel.endereco.cep}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${imovel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imovel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imovel.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sgmApp.imovel.home.notFound">No Imovels found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ imovel }: IRootState) => ({
  imovelList: imovel.entities,
  loading: imovel.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Imovel);
