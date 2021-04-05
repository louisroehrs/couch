--[[ Power controller user script code.

The scripting implementation has changed, and is no longer compatible
with the older BASIC implementation. The most important changes are:

- Now Lua-based.
- No more line numbers, blocks of code identified by functions.
- Most of ON, OFF, etc. are kept as legacy functions, which can be called like
 e.g  ON(2345), ON("2345") or ON "2345", your choice.

Execution is still based on threads. Now threads are more visible and
manageable. Try starting some and you'll see them appearing in the
list.

Scripting samples are now available as snippets (below), separate from
the main script code. You can copy/paste them from/to the main script.

Stock snippets have names starting with 'default.'; changing or
creating snippets with such names is not recommended as your changes
may be erased on an upgrade.

chairsRequestedOn list of chairs (outlet numbers that want heat)  // binary, so first three chairs.
chairs must be in the first x outlets, x being total number of chairs.
]]--

chairsRequestedOn = {1,1,0,0,0,0,0,0}
maxChairs = 3
chairsOn = true
delayTime = 270

function requestChair(chair)
  if chair <= maxChairs
    then
    chairsRequestedOn[chair] = 1
  end
end

function requestChairOne()
  requestChair(1)
end

function requestChairTwo()
  requestChair(2)
end

function requestChairThree()
  requestChair(3)
end

function chairOffOne()
  chairOff(1)
end

function chairOffTwo()
  chairOff(2)
end

function chairOffThree()
  chairOff(3)
end

function allChairsOff()
  chairsOn = false
end


function getRequestedChairs()
  return chairsRequestedOn
end


function chairOff(chair)
  if chair <= maxChairs
    then
    chairsRequestedOn[chair] = 0
  end
end

function keepAtMostOneChairOn()
  chairsOn = true
  log.warning("hi")
  local currentOnChair = 0
  local lastOnChair = 0
  
  while chairsOn do 
    currentOnChair = currentOnChair + 1;
    if currentOnChair > maxChairs 
      then currentOnChair = 1
    end
    
    if (chairsRequestedOn[currentOnChair] == 1) and (not (currentOnChair == lastOnChair))
      then 
      for i = 1, maxChairs do
        outlet[i].state = off
      end
      log.warning("Chair " .. currentOnChair .. " on.")
      outlet[currentOnChair].state = on
      lastOnChair = currentOnChair
      delay(delayTime)
    else
      log.warning("Chair " .. lastOnChair .. " stays on. " .. currentOnChair)
    end
    delay(10)
  end
  for i = 1, maxChairs do
        outlet[i].state = off
  end
end


    
function start_scripts()
  if not chairsOn then
    thread.run(keepAtMostOneChairOn, "Keep at most one chair on", "RoundRobinChair")
    chairsOn = true
  end
 
end


