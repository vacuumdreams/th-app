import React, { useState } from 'react'

import Container from '@material-ui/core/Container'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

import Info from './info'
import Location from './location'
import Details from './details'
import Review from './review'

const STEPS = [
  {
    label: 'Info',
    Content: Info,
  },
  {
    label: 'Location',
    Content: Location,
  },
  {
    label: 'Details',
    Content: Details,
  },
  {
    label: 'Review',
    Content: Review,
  }
]

export default function PlaceSteps ({
  typeList = [],
  socialList = [],
  featureList = [],
  onSubmit,
}) {
  const [place, setPlace] = useState({})
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {
        STEPS.map(({ label, Content }, i) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Container component="main" maxWidth="xs">
                <Content
                  place={place}
                  typeList={typeList}
                  socialList={socialList}
                  featureList={featureList}
                  isBack={i > 0}
                  isNext={i < STEPS.length - 1}
                  onBack={(newPlace) => {
                    setPlace({ ...place, ...newPlace })
                    setActiveStep(i - 1)
                  }}
                  onNext={(newPlace) => {
                    setPlace({ ...place, ...newPlace })
                    setActiveStep(i + 1)
                  }}
                  onSubmit={onSubmit}
                />
              </Container>
            </StepContent>
          </Step>
        ))
      }
    </Stepper>
  )
}
