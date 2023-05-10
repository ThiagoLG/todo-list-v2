import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { debounce } from '@mui/material/utils'
import { useEffect, useMemo, useRef, useState } from 'react'

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
  place_id: string
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyC9P6t5cCIExLyxGFuj3Nm1accolzVUBmY'
const autocompleteService = { current: null }

const loadScript = (src: string, position: HTMLElement | null, id: string) => {
  if (!position) return

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

export default function GoogleMaps() {
  const [value, setValue] = useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly PlaceType[]>([])
  const loaded = useRef(false)
  let geocoder: any

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      )
    }

    loaded.current = true
  }

  const _fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          ;(autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          )
        },
        400,
      ),
    [],
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }

    if (!autocompleteService.current) return undefined

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    _fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value) newOptions = [value]

        if (results) newOptions = [...newOptions, ...results]

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, _fetch])

  const getExtraGeocodingInfos = async (placeId: string) => {
    if (!geocoder) geocoder = new (window as any).google.maps.Geocoder()

    const infos = await geocoder.geocode({ placeId })

    return infos.results[0]
  }

  const handleOptionSelect = async (
    _event: any,
    newValue: PlaceType | null,
  ) => {
    if (newValue) {
      const extraInfos: PlaceType = await getExtraGeocodingInfos(
        newValue.place_id,
      )
      newValue = { ...newValue, ...extraInfos }
    }

    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue)
    console.log('newValue', newValue)
  }

  return (
    <Autocomplete
      id="google-map-search"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      options={options}
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={handleOptionSelect}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label="Address" variant="standard" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: '2.5rem' }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 2.5rem)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
