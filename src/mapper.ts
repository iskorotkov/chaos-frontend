import { MapperConfiguration, MappingPair } from '@dynamic-mapper/mapper'
import { ActionDto, StageDto, TargetDto, WorkflowPreviewResponse } from './workflows/dto/workflows'
import { Action, Stage, Target, Workflow } from './workflows/model/workflows'
import { duration } from 'moment'

export const workflowDtoToModel = new MappingPair<WorkflowPreviewResponse, Workflow>()
export const stageDtoToModel = new MappingPair<StageDto, Stage>()
export const actionDtoToModel = new MappingPair<ActionDto, Action>()
export const targetDtoToModel = new MappingPair<TargetDto, Target>()

export function createMapper () {
  const config = new MapperConfiguration(cfg => {
    cfg.createStrictMap(workflowDtoToModel, {
      stages: opt => opt.mapFromUsing(src => src?.workflow?.stages ?? [], stageDtoToModel)
    })
    cfg.createStrictMap(stageDtoToModel, {
      actions: opt => opt.mapFromUsing(src => src.actions ?? [], actionDtoToModel),
      duration: opt => opt.mapFrom(src => duration(src.duration))
    })
    cfg.createStrictMap(actionDtoToModel, {
      name: opt => opt.auto(),
      target: opt => {
        opt.condition(src => src.name !== undefined)
        opt.mapFromUsing(src => src.target, targetDtoToModel)
      },
      manifest: opt => opt.ignore(),
      parameters: opt => opt.ignore(),
      scale: opt => opt.auto(),
      severity: opt => opt.auto()
    })
    cfg.createStrictMap(targetDtoToModel, {
      label: opt => opt.mapFrom(src => src.appLabel ?? '')
    })
  })

  return config.createMapper()
}
