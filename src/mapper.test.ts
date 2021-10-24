import { actionDtoToModel, createMapper, targetDtoToModel } from './mapper'
import { Mapper } from '@dynamic-mapper/mapper'
import { ActionDto, TargetDto } from './workflows/dto/workflows'
import { Target } from './workflows/model/workflows'

let mapper: Mapper

beforeAll(() => {
  mapper = createMapper()
})

describe('target mapping', () => {
  it('valid dto', () => {
    const target = mapper.map(targetDtoToModel, <TargetDto>{
      appLabel: 'nginx'
    })

    expect(target.label).toBe('nginx')
  })
})

describe('action mapping', () => {
  it('valid dto', () => {
    const action = mapper.map(actionDtoToModel, <ActionDto>{
      name: 'network failure',
      scale: 'massive',
      severity: 'severe',
      engine: {
        name: 'network experiment'
      },
      target: <TargetDto>{
        appLabel: 'nginx'
      }
    })

    expect(action).toEqual({
      name: 'network failure',
      scale: 'massive',
      severity: 'severe',
      target: <Target>{
        label: 'nginx'
      }
    })
  })
})
