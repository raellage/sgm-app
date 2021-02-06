import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImovel } from 'app/shared/model/imovel.model';
import { getEntities as getImovels } from 'app/entities/imovel/imovel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './debito.reducer';
import { IDebito } from 'app/shared/model/debito.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDebitoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DebitoUpdate = (props: IDebitoUpdateProps) => {
  const [imovelId, setImovelId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { debitoEntity, imovels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/debito');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getImovels();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...debitoEntity,
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
          <h2 id="sgmApp.debito.home.createOrEditLabel">
            <Translate contentKey="sgmApp.debito.home.createOrEditLabel">Create or edit a Debito</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : debitoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="debito-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="debito-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="anoReferenciaLabel" for="debito-anoReferencia">
                  <Translate contentKey="sgmApp.debito.anoReferencia">Ano Referencia</Translate>
                </Label>
                <AvField
                  id="debito-anoReferencia"
                  type="string"
                  className="form-control"
                  name="anoReferencia"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="valorLabel" for="debito-valor">
                  <Translate contentKey="sgmApp.debito.valor">Valor</Translate>
                </Label>
                <AvField
                  id="debito-valor"
                  type="string"
                  className="form-control"
                  name="valor"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="debito-status">
                  <Translate contentKey="sgmApp.debito.status">Status</Translate>
                </Label>
                <AvInput
                  id="debito-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && debitoEntity.status) || 'PENDENTE'}
                >
                  <option value="PENDENTE">{translate('sgmApp.StatusDebito.PENDENTE')}</option>
                  <option value="PAGO">{translate('sgmApp.StatusDebito.PAGO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="debito-imovel">
                  <Translate contentKey="sgmApp.debito.imovel">Imovel</Translate>
                </Label>
                <AvInput id="debito-imovel" type="select" className="form-control" name="imovel.id">
                  <option value="" key="0" />
                  {imovels
                    ? imovels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.numeroCadastro}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/debito" replace color="info">
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
  imovels: storeState.imovel.entities,
  debitoEntity: storeState.debito.entity,
  loading: storeState.debito.loading,
  updating: storeState.debito.updating,
  updateSuccess: storeState.debito.updateSuccess,
});

const mapDispatchToProps = {
  getImovels,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DebitoUpdate);
