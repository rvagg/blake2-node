{
  "targets": [{
    "target_name": "blake2",
    "include_dirs": [ "<!(node -p \"require('node-addon-api').include_dir\")" ],
    "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
    "sources": [
      "src/binding.cc",
      "src/blake2b.c",
      "src/blake2s.c"
    ],
    "conditions": [
      ['OS=="mac"', {
        'cflags+': ['-fvisibility=hidden'],
        'xcode_settings': {
          'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES', # -fvisibility=hidden
        }
      }]
    ]
  }]
}
