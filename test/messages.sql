DO $$
BEGIN
  RAISE DEBUG 'Test DEBUG message';
  RAISE LOG 'Test LOG message';
  RAISE INFO 'Test INFO message';
  RAISE NOTICE 'Test NOTICE message';
  RAISE WARNING 'Test WARNING message';
  RAISE EXCEPTION 'Test EXCEPTION with format %', 'string and hint' USING
    HINT = 'This is a HINT', DETAIL = 'This is detail';
END $$;
