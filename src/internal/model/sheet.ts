import { uuid } from './common'
import { Topic, TopicId } from './topic'
import { Relationship, RelationshipId } from './relationship'

export type SheetId = string
export class Sheet {
  readonly title: string
  readonly id: SheetId
  private _rootTopic: Topic | null = null
  private _relationships: Relationship[]

  constructor(title: string) {
    this.id = uuid()
    this.title = title
    this._relationships = []
  }

  get rootTopic(): Readonly<Topic | null> {
    return this._rootTopic
  }

  get relationships(): ReadonlyArray<Relationship> {
    return this._relationships
  }

  public addRootTopic(title: string): Topic {
    if (this._rootTopic) {
      throw new Error('Duplicated root topic creation')
    }
    this._rootTopic = new Topic(title)
    return this._rootTopic
  }

  public removeRootTopic(): void {
    this._rootTopic = null
  }

  public addRelationship(title: string, startTopicId: TopicId, endTopicId: TopicId): Relationship {
    const relationship = new Relationship(title, startTopicId, endTopicId)
    this._relationships.push(relationship)
    return relationship
  }

  public removeRelationship(identifier: RelationshipId | TopicId): void {
    this._relationships = this._relationships.filter(
      relationship =>
        relationship.id !== identifier &&
        relationship.startTopicId !== identifier &&
        relationship.endTopicId !== identifier
    )
  }
}
