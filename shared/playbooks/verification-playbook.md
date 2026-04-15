# Verification Playbook

## Purpose

Turn recurring readiness checks into a reusable workflow that makes validation scope explicit.

## Default Verification Order

1. Define what "ready" means for the target artifact.
2. List available checks and constraints.
3. Run or specify the checks that were actually performed.
4. Separate verified behavior from unverified assumptions.
5. End with residual risks and the next recommended action.

## Verification Output Shape

- target
- checks performed
- verified outcomes
- unverified areas
- residual risks

## Good Fit

- readiness checks before completion
- configuration or mapping validation
- document and framework surface validation
- post-change acceptance checks

## Bad Fit

- claiming full verification without naming actual checks
- collapsing review and verification into one vague statement
