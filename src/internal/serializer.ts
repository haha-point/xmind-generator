import { Relationship } from './model/relationship'
import { Sheet } from './model/sheet'
import { Topic } from './model/topic'
import { Workbook } from './model/workbook'

export type SerializedObject = Record<string, unknown>

export function serializeWorkbook(workbook: Workbook): ReadonlyArray<SerializedObject> {
  return workbook.sheets.map(sheet => serializeSheet(sheet))
}

export function serializeSheet(sheet: Sheet): Readonly<SerializedObject> {
  const obj: SerializedObject = { id: sheet.id, class: 'sheet', title: sheet.title ?? '' }
  if (sheet.rootTopic) {
    obj.rootTopic = serializeTopic(sheet.rootTopic)
  }
  if (sheet.relationships.length > 0) {
    obj.relationships = sheet.relationships.map(relationship => serializeRelationship(relationship))
  }
  return obj
}

export function serializeTopic(topic: Topic | Readonly<Topic>): Readonly<SerializedObject> {
  const obj: SerializedObject = { id: topic.id, class: 'topic', title: topic.title ?? '' }
  const { note, labels } = topic.attributes

  if (note) {
    obj.notes = {
      plain: { content: note + '\n' }
    }
  }

  if (labels) {
    obj.labels = labels
  }

  if (topic.children.length > 0) {
    obj.children = {
      attached: topic.children.map(child => serializeTopic(child))
    }
  }

  return obj
}

export function serializeRelationship(relationship: Relationship): Readonly<SerializedObject> {
  return {
    id: relationship.id,
    class: 'relationship',
    end1Id: relationship.fromTopicId,
    end2Id: relationship.toTopicId,
    title: relationship.title ?? ''
  }
}
