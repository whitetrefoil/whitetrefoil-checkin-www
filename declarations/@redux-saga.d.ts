// IDEA now cannot recognize typesVersions field in package.json
// see: https://youtrack.jetbrains.com/issue/WEB-42898

declare module '@redux-saga/core' {
  export {
    default,
    Saga, SagaIterator, Buffer, Channel, Task,
    SagaMonitor,
    createSagaMiddleware,
    SagaMiddlewareOptions,
    SagaMiddleware,
    EffectMiddleware,
    runSaga,
    RunSagaOptions,
    CANCEL, END,
    TakeableChannel,
    PuttableChannel,
    FlushableChannel,
    channel,
    eventChannel,
    Subscribe,
    Unsubscribe,
    EventChannel,
    PredicateTakeableChannel,
    MulticastChannel,
    multicastChannel,
    stdChannel,
    detach,
    buffers,
  }        from '@redux-saga/core/types/ts3.6';
  export * from '@redux-saga/core/types/ts3.6';
}

declare module '@redux-saga/types' {
  export {
    Saga,
    SagaIterator,
    GuardPredicate,
    ActionType,
    Predicate,
    StringableActionCreator,
    SubPattern,
    Pattern,
    ActionSubPattern,
    ActionPattern,
    ActionMatchingPattern,
    ActionMatchingSubPattern,
    Buffer,
    Channel,
    Effect,
    SimpleEffect,
    StrictEffect,
    ArrayCombinatorEffectDescriptor,
    ObjectCombinatorEffectDescriptor,
    CombinatorEffectDescriptor,
    CombinatorEffect,
    StrictCombinatorEffect,
    END,
    Task,
  }        from '@redux-saga/types/types/ts3.6';
  export * from '@redux-saga/types/types/ts3.6';
}
