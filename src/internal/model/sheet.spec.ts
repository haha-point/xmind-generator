import { describe, it, expect } from 'vitest'
import { Workbook } from './workbook'

describe('[internal/model/sheet] addRootTopic()', () => {
  it('should create a root topic attached to the sheet', () => {
    const sheet = new Workbook().addSheet('Grill House')
    sheet.addRootTopic('Smoked Bacon')
    expect(sheet.rootTopic?.title).toBe('Smoked Bacon')
  })

  it('should throw exception if root topic of the sheet already created', () => {
    const sheet = new Workbook().addSheet('Grill House')
    sheet.addRootTopic('Smoked Bacon')

    expect(() => sheet.addRootTopic('Smoked Bacon')).toThrowError('Duplicated root topic creation')
  })
})

describe('[internal/model/sheet] removeRootTopic()', () => {
  it('should remove root topic from the sheet', () => {
    const sheet = new Workbook().addSheet('Grill House')
    sheet.addRootTopic('Smoked Bacon')
    sheet.removeRootTopic()
    expect(sheet.rootTopic).toBeNull()
  })
})

describe('[internal/model/sheet] addRelationship()', () => {
  it('should add a relationship from the sheet', () => {
    const sheet = new Workbook().addSheet('Grill House')
    sheet.addRelationship('Smoked Bacon', 'topic1-xxx-xxx', 'topic2-xxx-xxx')
    expect(sheet.relationships).toHaveLength(1)
    expect(sheet.relationships[0]?.startTopicId).toBe('topic1-xxx-xxx')
  })
})

describe('[internal/model/sheet] addRelationship()', () => {
  it('should remove a relationship from the sheet', () => {
    const sheet = new Workbook().addSheet('Grill House')
    sheet.addRelationship('Smoked Bacon', 'topic1-xxx-xxx', 'topic2-xxx-xxx')
    expect(sheet.relationships).toHaveLength(1)
    sheet.removeRelationship('invalid-id')
    expect(sheet.relationships).toHaveLength(1)
    sheet.removeRelationship('topic2-xxx-xxx')
    expect(sheet.relationships).toHaveLength(0)
  })
})
