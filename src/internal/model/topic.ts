import { uuid } from './common'

export type TopicId = string
export type TopicImageData = `data:image/${string}` | ArrayBuffer | Buffer | Blob | Uint8Array
export type TopicAttributes = { labels?: string[]; note?: string; image?: TopicImageData | null }

export class Topic {
  readonly id: TopicId
  readonly title: string
  readonly attributes: TopicAttributes
  private _children: Topic[]

  constructor(title: string, attributes?: TopicAttributes, children?: Topic[]) {
    this.id = uuid()
    this.title = title
    this.attributes = attributes ?? {}
    this._children = children ?? []
  }

  get children(): ReadonlyArray<Topic> {
    return this._children
  }

  public query(topicId: TopicId): Topic | null {
    if (topicId === this.id) {
      return this
    } else {
      return this._children.find(child => child.query(topicId) !== null) ?? null
    }
  }

  public addTopic(title: string, attributes?: TopicAttributes): Topic {
    const childTopic = new Topic(title, attributes)
    this._children.push(childTopic)
    return childTopic
  }

  public removeTopic(topicId: TopicId): void {
    this._children = this._children.filter(child => child.id !== topicId)
  }

  public addImage(imageData: TopicImageData): void {
    this.attributes.image = imageData
  }

  public removeImage(): void {
    this.attributes.image = null
  }
}
