/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const { blake2b, blake2s } = require('../')
const { assert } = require('chai')

describe('blake2', () => {
  it('dcposch/blakejs blake2b', () => {
    assert.equal(
      blake2b(Buffer.from('abc'), null, 64).toString('hex'),
      'ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923'
    )
    assert.equal(
      blake2b(Buffer.from(''), null, 64).toString('hex'),
      '786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce'
    )
    assert.equal(
      blake2b(Buffer.from('The quick brown fox jumps over the lazy dog'), null, 64).toString('hex'),
      'a8add4bdddfd93e4877d2746e62817b116364a1fa7bc148d95090bc7333b3673f82401cf7aa2e4cb1ecd90296e3f14cb5413f8ed77be73045b13914cdcd6a918'
    )
  })

  it('dcposch/blakejs blake2s', () => {
    assert.equal(
      blake2s(Buffer.from('abc'), null, 32).toString('hex'),
      '508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982'
    )
    assert.equal(
      blake2s(new Uint8Array([97, 98, 99]), null, 32).toString('hex'),
      '508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982'
    )
  })

  it('dcposch/blakejs generated test vectors', () => {
    const vectors = fs.readFileSync(path.join(__dirname, 'dcposch_blakejs_generated_test_vectors.txt'), 'utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.split('\t'))

    for (const vector of vectors) {
      const [inputHex, keyHex, outLen, outHex] = vector
      assert.equal(blake2b(Buffer.from(inputHex, 'hex'), Buffer.from(keyHex, 'hex'), parseInt(outLen, 10)).toString('hex'), outHex)
    }
  })

  describe('blake2*-kat vectors', () => {
    const run = (fn) => {
      const lines = fs.readFileSync(path.join(__dirname, `${fn === blake2b ? 'blake2b' : 'blake2s'}-kat.txt`), 'utf8').split(/\r?\n/).filter(Boolean)
      let input
      let key
      let vectors = 0
      for (const line of lines) {
        if (line.startsWith('in:')) {
          input = Buffer.from(line.replace(/^in:\s+/, ''), 'hex')
        } else if (line.startsWith('key:')) {
          key = Buffer.from(line.replace(/^key:\s+/, ''), 'hex')
        } else if (line.startsWith('hash:')) {
          const hash = line.replace(/^hash:\s+/, '')
          assert.equal(fn(input, key, hash.length / 2).toString('hex'), hash)
          vectors++
        }
      }
      assert.equal(vectors, 256)
    }

    it('blake2b', () => {
      run(blake2b)
    })

    it('blake2s', () => {
      run(blake2s)
    })
  })
})
