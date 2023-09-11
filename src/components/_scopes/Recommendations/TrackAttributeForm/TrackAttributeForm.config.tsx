const attributes = [
  {
    defaultValue: 0,
    description:
      'This attribute represents the target acousticness score for tracks. It specifies the desired level of acousticness, with a range from 0 (not acoustic) to 1 (completely acoustic).',
    label: 'Acousticness',
    max: 1,
    min: 0,
    name: 'target_acousticness',
    step: 0.1,
  },

  {
    defaultValue: 0,
    description:
      'This attribute represents the target danceability score for tracks. It defines the desired danceability level, ranging from 0 (not danceable) to 1 (very danceable).',
    label: 'Danceability',
    max: 1,
    min: 0,
    name: 'target_danceability',
    step: 0.1,
  },

  {
    defaultValue: 0,
    description:
      'This attribute sets the desired target duration (in milliseconds) for tracks. It helps select tracks with durations closest to the specified value.',
    label: 'Duration (min)',
    max: 1_200_000,
    min: 0,
    name: 'target_duration_ms',
    step: 100,
  },

  {
    defaultValue: 0,
    description:
      'This attribute represents the desired energy level for tracks. It ranges from 0 (low energy) to 1 (high energy) and helps select tracks with energy scores close to the target value.',
    label: 'Energy',
    max: 1,
    min: 0,
    name: 'target_energy',
    step: 0.1,
  },

  {
    defaultValue: 0,
    description:
      'This attribute specifies the target instrumentalness score for tracks. It sets the desired level of instrumentalness, with values ranging from 0 (not instrumental) to 1 (completely instrumental).',
    label: 'Instrumentalness',
    max: 1,
    min: 0,
    name: 'target_instrumentalness',
    step: 0.1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute defines the target key value. It helps select tracks with key values closest to the specified target key.',
    label: 'Key',
    max: 11,
    min: 0,
    name: 'target_key',
    step: 1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute represents the desired liveness score for tracks. It specifies the desired level of liveness, ranging from 0 (not live) to 1 (live performance).',
    label: 'Liveness',
    max: 1,
    min: 0,
    name: 'target_liveness',
    step: 0.1,
  },

  {
    description:
      'This attribute sets the desired loudness level for tracks. It ranges from -60 dB (quiet) to 0 dB (loud) and helps select tracks with loudness levels close to the target value.',
    label: 'Loudness',
    max: 0,
    min: -60,
    name: 'target_loudness',
    step: 0.1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute represents the target mode value. It helps select tracks with mode values closest to the specified target mode.',
    label: 'Mode',
    max: 1,
    min: 0,
    name: 'target_mode',
    step: 0.1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute specifies the desired target popularity score for tracks. It ranges from 0 (not popular) to 100 (very popular) and helps select tracks with popularity scores close to the target value.',
    label: 'Popularity',
    max: 100,
    min: 0,
    name: 'target_popularity',
    step: 1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute represents the desired speechiness score for tracks. It specifies the desired level of speechiness, ranging from 0 (not speech-like) to 1 (highly speech-like).',
    label: 'Speechiness',
    max: 1,
    min: 0,
    name: 'target_speechiness',
    step: 0.1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute sets the desired target tempo value (in BPM) for tracks. It helps select tracks with tempo values closest to the specified target tempo.',
    label: 'Tempo',
    max: 1000,
    min: 0,
    name: 'target_tempo',
    step: 0.1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute specifies the desired target time signature value. It helps select tracks with time signature values closest to the specified target value.',
    label: 'Time Signature',
    max: 11,
    min: 0,
    name: 'target_time_signature',
    step: 1,
  },
  {
    defaultValue: 0,
    description:
      'This attribute represents the desired target valence score for tracks. It specifies the desired level of valence, ranging from 0 (negative emotion) to 1 (positive emotion).',
    label: 'Valence',
    max: 1,
    min: 0,
    name: 'target_valence',
    step: 1,
  },
];

export default attributes;
