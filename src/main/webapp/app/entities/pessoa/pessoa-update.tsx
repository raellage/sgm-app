import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPessoaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaUpdate = (props: IPessoaUpdateProps) => {
  const [enderecoId, setEnderecoId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pessoaEntity, enderecos, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pessoa');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEnderecos();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pessoaEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sgmApp.pessoa.home.createOrEditLabel">
            <Translate contentKey="sgmApp.pessoa.home.createOrEditLabel">Create or edit a Pessoa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pessoaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pessoa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pessoa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cpfLabel" for="pessoa-cpf">
                  <Translate contentKey="sgmApp.pessoa.cpf">Cpf</Translate>
                </Label>
                <AvField
                  id="pessoa-cpf"
                  type="text"
                  name="cpf"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nomeCompletoLabel" for="pessoa-nomeCompleto">
                  <Translate contentKey="sgmApp.pessoa.nomeCompleto">Nome Completo</Translate>
                </Label>
                <AvField
                  id="pessoa-nomeCompleto"
                  type="text"
                  name="nomeCompleto"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="pessoa-endereco">
                  <Translate contentKey="sgmApp.pessoa.endereco">Endereco</Translate>
                </Label>
                <AvInput id="pessoa-endereco" type="select" className="form-control" name="endereco.id">
                  <option value="" key="0" />
                  {enderecos
                    ? enderecos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.cep}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pessoa-user">
                  <Translate contentKey="sgmApp.pessoa.user">User</Translate>
                </Label>
                <AvInput id="pessoa-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pessoa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  enderecos: storeState.endereco.entities,
  users: storeState.userManagement.users,
  pessoaEntity: storeState.pessoa.entity,
  loading: storeState.pessoa.loading,
  updating: storeState.pessoa.updating,
  updateSuccess: storeState.pessoa.updateSuccess,
});

const mapDispatchToProps = {
  getEnderecos,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaUpdate);
