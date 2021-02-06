import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnderecoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Endereco = (props: IEnderecoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { enderecoList, match, loading } = props;
  return (
    <div>
      <h2 id="endereco-heading">
        <Translate contentKey="sgmApp.endereco.home.title">Enderecos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sgmApp.endereco.home.createLabel">Create new Endereco</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {enderecoList && enderecoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.endereco.cep">Cep</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.endereco.cidade">Cidade</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.endereco.bairro">Bairro</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.endereco.logradouro">Logradouro</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.endereco.numero">Numero</Translate>
                </th>
                <th>
                  <Translate contentKey="sgmApp.endereco.complemento">Complemento</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {enderecoList.map((endereco, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${endereco.id}`} color="link" size="sm">
                      {endereco.id}
                    </Button>
                  </td>
                  <td>{endereco.cep}</td>
                  <td>{endereco.cidade}</td>
                  <td>{endereco.bairro}</td>
                  <td>{endereco.logradouro}</td>
                  <td>{endereco.numero}</td>
                  <td>{endereco.complemento}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${endereco.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${endereco.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${endereco.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sgmApp.endereco.home.notFound">No Enderecos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ endereco }: IRootState) => ({
  enderecoList: endereco.entities,
  loading: endereco.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Endereco);
