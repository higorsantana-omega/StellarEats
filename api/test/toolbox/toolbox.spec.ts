import toolbox from '@/toolbox/toolbox'

describe('Toolbox', () => {
  it('should generate an uuid', async () => {
    const toolBox = toolbox

    const firstUUID = toolBox.generateUUID()
    expect(typeof firstUUID).toBe('string')
    expect(firstUUID).toHaveLength(36)

    const secondUUID = toolBox.generateUUID()
    expect(typeof secondUUID).toBe('string')
    expect(secondUUID).toHaveLength(36)

    expect(firstUUID).not.toEqual(secondUUID)
  })
})
