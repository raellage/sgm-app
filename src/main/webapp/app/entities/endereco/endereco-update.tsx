import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnderecoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnderecoUpdate = (props: IEnderecoUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { enderecoEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/endereco');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...enderecoEntity,
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
          <h2 id="sgmApp.endereco.home.createOrEditLabel">
            <Translate contentKey="sgmApp.endereco.home.createOrEditLabel">Create or edit a Endereco</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : enderecoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="endereco-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="endereco-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cepLabel" for="endereco-cep">
                  <Translate contentKey="sgmApp.endereco.cep">Cep</Translate>
                </Label>
                <AvField
                  id="endereco-cep"
                  type="text"
                  name="cep"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cidadeLabel" for="endereco-cidade">
                  <Translate contentKey="sgmApp.endereco.cidade">Cidade</Translate>
                </Label>
                <AvField
                  id="endereco-cidade"
                  type="text"
                  name="cidade"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="bairroLabel" for="endereco-bairro">
                  <Translate contentKey="sgmApp.endereco.bairro">Bairro</Translate>
                </Label>
                <AvField
                  id="endereco-bairro"
                  type="text"
                  name="bairro"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="logradouroLabel" for="endereco-logradouro">
                  <Translate contentKey="sgmApp.endereco.logradouro">Logradouro</Translate>
                </Label>
                <AvField
                  id="endereco-logradouro"
                  type="text"
                  name="logradouro"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="numeroLabel" for="endereco-numero">
                  <Translate contentKey="sgmApp.endereco.numero">Numero</Translate>
                </Label>
                <AvField
                  id="endereco-numero"
                  type="string"
                  className="form-control"
                  name="numero"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="complementoLabel" for="endereco-complemento">
                  <Translate contentKey="sgmApp.endereco.complemento">Complemento</Translate>
                </Label>
                <AvField id="endereco-complemento" type="text" name="complemento" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/endereco" replace color="info">
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
  enderecoEntity: storeState.endereco.entity,
  loading: storeState.endereco.loading,
  updating: storeState.endereco.updating,
  updateSuccess: storeState.endereco.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoUpdate);
