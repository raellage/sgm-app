import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPessoaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaDetail = (props: IPessoaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pessoaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgmApp.pessoa.detail.title">Pessoa</Translate> [<b>{pessoaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cpf">
              <Translate contentKey="sgmApp.pessoa.cpf">Cpf</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.cpf}</dd>
          <dt>
            <span id="nomeCompleto">
              <Translate contentKey="sgmApp.pessoa.nomeCompleto">Nome Completo</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.nomeCompleto}</dd>
          <dt>
            <Translate contentKey="sgmApp.pessoa.endereco">Endereco</Translate>
          </dt>
          <dd>{pessoaEntity.endereco ? pessoaEntity.endereco.cep : ''}</dd>
          <dt>
            <Translate contentKey="sgmApp.pessoa.user">User</Translate>
          </dt>
          <dd>{pessoaEntity.user ? pessoaEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/pessoa" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pessoa/${pessoaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pessoa }: IRootState) => ({
  pessoaEntity: pessoa.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaDetail);
