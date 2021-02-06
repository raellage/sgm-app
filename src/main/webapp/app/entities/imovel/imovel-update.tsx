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
import { getEntity, updateEntity, createEntity, reset } from './imovel.reducer';
import { IImovel } from 'app/shared/model/imovel.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImovelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ImovelUpdate = (props: IImovelUpdateProps) => {
  const [enderecoId, setEnderecoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { imovelEntity, enderecos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/imovel');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEnderecos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...imovelEntity,
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
          <h2 id="sgmApp.imovel.home.createOrEditLabel">
            <Translate contentKey="sgmApp.imovel.home.createOrEditLabel">Create or edit a Imovel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : imovelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="imovel-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="imovel-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numeroCadastroLabel" for="imovel-numeroCadastro">
                  <Translate contentKey="sgmApp.imovel.numeroCadastro">Numero Cadastro</Translate>
                </Label>
                <AvField
                  id="imovel-numeroCadastro"
                  type="text"
                  name="numeroCadastro"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="larguraLabel" for="imovel-largura">
                  <Translate contentKey="sgmApp.imovel.largura">Largura</Translate>
                </Label>
                <AvField id="imovel-largura" type="string" className="form-control" name="largura" />
              </AvGroup>
              <AvGroup>
                <Label id="comprimentoLabel" for="imovel-comprimento">
                  <Translate contentKey="sgmApp.imovel.comprimento">Comprimento</Translate>
                </Label>
                <AvField id="imovel-comprimento" type="string" className="form-control" name="comprimento" />
              </AvGroup>
              <AvGroup>
                <Label id="areaLabel" for="imovel-area">
                  <Translate contentKey="sgmApp.imovel.area">Area</Translate>
                </Label>
                <AvField id="imovel-area" type="string" className="form-control" name="area" />
              </AvGroup>
              <AvGroup>
                <Label id="zonaLabel" for="imovel-zona">
                  <Translate contentKey="sgmApp.imovel.zona">Zona</Translate>
                </Label>
                <AvInput
                  id="imovel-zona"
                  type="select"
                  className="form-control"
                  name="zona"
                  value={(!isNew && imovelEntity.zona) || 'RURAL'}
                >
                  <option value="RURAL">{translate('sgmApp.ZonaImovel.RURAL')}</option>
                  <option value="URBANA">{translate('sgmApp.ZonaImovel.URBANA')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="tipoLabel" for="imovel-tipo">
                  <Translate contentKey="sgmApp.imovel.tipo">Tipo</Translate>
                </Label>
                <AvInput
                  id="imovel-tipo"
                  type="select"
                  className="form-control"
                  name="tipo"
                  value={(!isNew && imovelEntity.tipo) || 'CASA'}
                >
                  <option value="CASA">{translate('sgmApp.TipoImovel.CASA')}</option>
                  <option value="APARTAMENTO">{translate('sgmApp.TipoImovel.APARTAMENTO')}</option>
                  <option value="TERRENO">{translate('sgmApp.TipoImovel.TERRENO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="imovel-latitude">
                  <Translate contentKey="sgmApp.imovel.latitude">Latitude</Translate>
                </Label>
                <AvField id="imovel-latitude" type="text" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="imovel-longitude">
                  <Translate contentKey="sgmApp.imovel.longitude">Longitude</Translate>
                </Label>
                <AvField id="imovel-longitude" type="text" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label for="imovel-endereco">
                  <Translate contentKey="sgmApp.imovel.endereco">Endereco</Translate>
                </Label>
                <AvInput id="imovel-endereco" type="select" className="form-control" name="endereco.id">
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
              <Button tag={Link} id="cancel-save" to="/imovel" replace color="info">
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
  imovelEntity: storeState.imovel.entity,
  loading: storeState.imovel.loading,
  updating: storeState.imovel.updating,
  updateSuccess: storeState.imovel.updateSuccess,
});

const mapDispatchToProps = {
  getEnderecos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImovelUpdate);
