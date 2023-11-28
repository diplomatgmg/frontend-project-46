export type ValueTypes = string | number | boolean | null | undefined | Record<string, unknown>;

export type DiffNode =
  | { type: 'added'; value: ValueTypes }
  | { type: 'removed'; value: ValueTypes }
  | { type: 'nested'; children: Record<string, DiffNode> }
  | { type: 'unchanged'; value: ValueTypes }
  | { type: 'changed'; value: ValueTypes; oldValue: ValueTypes }
