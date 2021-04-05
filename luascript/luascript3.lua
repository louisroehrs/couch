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

CHAIR_REQUEST = "chairRequest"


function init()
	external[CHAIR_REQUEST .. "1"] = false
	external[CHAIR_REQUEST .. "2"] = true
	external[CHAIR_REQUEST .. "3"] = false
end


maxChairs = 3
chairsOn = false
delayTime = 240

function requestChair(chair)
  if chair <= maxChairs
    then
    external[CHAIR_REQUEST .. chair] = true
  end
  logRequestedChairs()
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
  logRequestedChairs()
  return chairsRequestedOn
end


function chairOff(chair)
  if chair <= maxChairs
    then
    external[CHAIR_REQUEST .. chair] = false
  end
  logRequestedChairs()
end

function chairRequested(chair)
  return external[CHAIR_REQUEST .. chair]
end

function logRequestedChairs()
  log.warning("Requests: " ..  tostring(chairRequested(1)) .. tostring(chairRequested(2)) .. tostring(chairRequested(3)));
end


function keepAtMostOneChairOn()
  init()
  chairsOn = true
  log.warning("hi")
  local currentOnChair = 1
  local lastOnChair = 0

  for i = 1, maxChairs do
     outlet[i].state = off
  end

  while chairsOn do 
    logRequestedChairs()
    while not chairRequested(currentOnChair) do
	    currentOnChair = currentOnChair + 1;
	    if currentOnChair > maxChairs 
	      then currentOnChair = 1
	    end
      delay(1)
    end
    logRequestedChairs()
	for i = 1, maxChairs do
      if (i == currentOnChair) and (chairRequested(currentOnChair)) then
    	outlet[i].state = on
	    log.warning("Chair " .. i .. " on.")
        lastOnChair = currentOnChair
      else	
        outlet[i].state = off
        log.warning("Chair " .. i .. " off.")
      end
	end
    delay(delayTime)
  end
  for i = 1, maxChairs do
    outlet[i].state = off
    log.warning("stopping script via allchairsoff: Chair " .. i .." off.")
  end
end


    
function start_scripts()
  if not chairsOn then
    thread.run(keepAtMostOneChairOn, "Keep at most one chair on", "RoundRobinChair")
    chairsOn = true
  end
 
end


